import { useState } from 'react';
import Router from 'next/router';

export default function NewPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        // Replace this URL with your actual endpoint
        const baseUrl = process.env.NODE_ENV === 'production'
            ? `https://${process.env.VERCEL_URL}`
            : 'http://localhost:3000';

        const url = `${baseUrl}/api/posts`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
            // Redirect to home page or another page
            Router.push('/');
        } else {
            // Handle errors or show a message
            alert('Failed to create the post.');
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title" className="form-label">Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="form-input"
                />
    
                <label htmlFor="content" className="form-label">Content</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="form-textarea"
                />
    
                <button type="submit" className="form-button">Create Post</button>
            </form>
        </div>
    );
}