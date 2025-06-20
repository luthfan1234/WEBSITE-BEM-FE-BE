'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Basic validation
        if (formData.password !== formData.password_confirmation) {
            setError('Passwords do not match');
            return;
        }
        
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setIsLoading(true);

        try {
            const result = await register(formData);

            if (result.success) {
                router.push('/admin/dashboard');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error('Registration error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Layout headerStyle={1}>
                <section className="bg-sign-in" style={{height:"100vh"}}>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="sign-in-form style2 mx-auto">
                                    <h2>SIGN UP</h2>
                                    <p>Create a new account</p>
                                    
                                    {error && (
                                        <div className="alert alert-danger" role="alert">
                                            {error}
                                        </div>
                                    )}
                                    
                                    <form onSubmit={handleSubmit} id="contactform">
                                        <fieldset>
                                            <input 
                                                id="name" 
                                                name="name" 
                                                tabIndex={1} 
                                                aria-required="true" 
                                                required 
                                                type="text" 
                                                placeholder="Your full name" 
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <input 
                                                name="email" 
                                                tabIndex={2} 
                                                aria-required="true" 
                                                type="email" 
                                                placeholder="Your email" 
                                                required 
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <input 
                                                id="password" 
                                                name="password" 
                                                tabIndex={3} 
                                                aria-required="true" 
                                                type="password" 
                                                placeholder="Set your password" 
                                                required 
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <input 
                                                id="password_confirmation" 
                                                name="password_confirmation" 
                                                tabIndex={4} 
                                                aria-required="true" 
                                                type="password" 
                                                placeholder="Confirm your password" 
                                                required 
                                                value={formData.password_confirmation}
                                                onChange={handleChange}
                                            />
                                        </fieldset>
                                        <button 
                                            className="tf-button submit" 
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'SIGNING UP...' : 'SIGN UP'}
                                        </button>
                                    </form>
                                    
                                    <div className="choose-sign mt-3">
                                        Already have an account? <Link href="/sign-in">Sign in</Link>
                                    </div>
                                    
                                    <div className="or"><span>login with</span></div>
                                    <div className="box-sign-social">
                                        <Link className="tf-button" href="#"><i className="fab fa-google" />Google</Link>
                                        <Link className="tf-button" href="#"><i className="fab fa-facebook-f" />Facebook</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}