import { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

export const Upload = () => {
    const [name, setName] = useState('');
    const [base64Image, setBase64Image] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        
        try {
            setIsLoading(true);
            const reader = new FileReader();
            reader.readAsDataURL(base64Image);
            reader.onloadend = () => {
                fetch('http://localhost:9000/api/upload', {
                    method: 'POST',
                    body: JSON.stringify({ name, base64Image: reader.result }),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(() => {
                    setIsLoading(false);
                    toast.success("Upoad Images Success!");
                    setName("");
                    setBase64Image("");
                });
            };
        } catch (err) {
            console.error(err);
            setName("");
            setBase64Image("");
        }
      }
    

    return (
        <div className="container py-4">
            <ToastContainer position="top-center" autoClose={2000} />
            <h1 className="text-center">Upload Image</h1>
            <Form className="mt-3">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="email" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.File type="file" accept="image/*" id="image" label="Select image" onChange={(e) => setBase64Image(e.target.files[0])} custom />
                </Form.Group>
                <Button
                    disabled={ (name === '' || base64Image === '') | isLoading }
                    variant="primary" type="submit"
                    block
                    onClick={onSubmit}
                >
                    {!isLoading ? (
                        'Submit'
                    ): (
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    )}
                </Button>
            </Form>
        </div>
    )
}