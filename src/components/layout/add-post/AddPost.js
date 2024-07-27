import React, { useState, useMemo, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import ReactQuill from 'react-quill';
import { message } from "antd";

import { app } from '../../../firebase/init';
import { addPost } from "../../../actions/postAction";

import 'react-quill/dist/quill.snow.css';

import './AddPost.css';

const storage = getStorage(app);

const AddPost = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const editorRef = useRef();
    const [imageURL, setImageURL] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const imageInputRef = useRef(null);

    const [formError, setFormError] = useState({
        isTitleValid: true,
        isShortDescriptionValid: true,
    });

    const handleEditorChange = (html) => {
        setContent(html);
    };

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('image', file);

            const storageRef = ref(storage, 'uploads/' + file.name);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            const editor = editorRef.current.getEditor();
            const cursorPosition = editor.getSelection(true);
            const index = cursorPosition ? cursorPosition.index : editor.getLength();
            editor.insertEmbed(index, 'image', downloadURL, 'user');
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['link', 'image'],
                ['clean'],
                ['video'],
                ['clean'],
                ['link', 'image'],
                [{ 'header': 1 }, { 'header': 2 }],
                ['indent', { 'direction': 'rtl' }],
            ],
            handlers: {
                image: imageHandler
            }
        }
    }), []);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const storageRef = ref(storage, 'uploads/' + file.name);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setImageURL(downloadURL);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        setFormError({
            isTitleValid: true,
            isShortDescriptionValid: true
        });

        const titleValidity = title.trim().length >= 5;
        const shortDescriptionValidity = shortDescription.trim().length >= 10;

        if(titleValidity && shortDescriptionValidity){
            dispatch(addPost(title, shortDescription, content, imageURL));
            message.success('Post added');
            history.push('/dashboard');
        }else{
            setFormError({
                isTitleValid: titleValidity,
                isShortDescriptionValid: shortDescriptionValidity
            });
        }
    }

    return(
        <div>
            <h1 className="large text-primary">Add Post</h1>
            <p className="lead"><i className="fas fa-print"></i> Whats on your mind ?</p>
            <form className='form my-1' onSubmit={submitHandler}>
                <div className="form-group">
                    <input name='title' type={'text'} placeholder='Enter Heading' value={title}
                           onChange={e => setTitle(e.target.value)}
                           required/>
                    {!formError.isTitleValid &&
                        <p className={'error-message'}>Title should minimum 3 chars</p>}
                </div>
                <div className="form-group">
                    <p>Add Featured image</p>
                    <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageUpload} required/>
                    <div>
                        {imageURL && (
                            <div className={'custom-image-container'}>
                                <img src={imageURL} alt="Uploaded" className={'custom-image'}/>
                            </div>
                        )}
                    </div>
                </div>
                <div className="form-group">
                    <textarea name='text' cols='30' rows='5' placeholder='Enter short description'
                              value={shortDescription}
                              onChange={e => setShortDescription(e.target.value)} required/>
                    {!formError.isShortDescriptionValid &&
                        <p className={'error-message'}>Short Description should minimum 10 chars</p>}
                </div>
                <div className="form-group">
                    <ReactQuill ref={editorRef} theme="snow" value={content} onChange={handleEditorChange}
                                modules={modules} style={{height: '400px'}}/>
                </div>
                <div className={'custom-spacer'}>
                    <input type='submit' className='btn btn-dark my-1' value='Submit'/>
                </div>
            </form>
        </div>
    )
}

export default AddPost;