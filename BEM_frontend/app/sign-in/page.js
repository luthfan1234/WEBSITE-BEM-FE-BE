'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';

export default function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    // Example credentials for admin access
    const [showHint, setShowHint] = useState(false);
    const adminCredentials = {
        email: 'admin@bemsvuns.com',
        password: 'admin123'
    };
    
    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleShowHint = () => {
        setShowHint(!showHint);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await login({
                email: formData.email,
                password: formData.password,
                remember: formData.remember
            });

            if (result.success) {
                router.push('/admin/dashboard');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Login failed. Please try again.');
            console.error('Login error:', err);
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
                                <div className="sign-in-form mx-auto">
                                    <h2>SIGN IN</h2>
                                    <p>Welcome back! Please enter your details</p>
                                    
                                    {error && (
                                        <div className="alert alert-danger" role="alert">
                                            {error}
                                        </div>
                                    )}
                                    
                                    {/* Admin credentials hint */}
                                    <div className="mb-3">
                                        <button 
                                            type="button" 
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={handleShowHint}
                                            suppressHydrationWarning
                                        >
                                            {showHint ? 'Hide Admin Credentials' : 'Show Admin Credentials'}
                                        </button>
                                        
                                        {showHint && (
                                            <div className="alert alert-info mt-2">
                                                <strong>Admin Login:</strong><br />
                                                Email: {adminCredentials.email}<br />
                                                Password: {adminCredentials.password}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <form onSubmit={handleSubmit} id="contactform">
                                        <fieldset>
                                            <input 
                                                id="email" 
                                                name="email" 
                                                tabIndex={1} 
                                                aria-required="true" 
                                                required 
                                                type="email" 
                                                placeholder="Email Address" 
                                                value={formData.email}
                                                onChange={handleChange}
                                                suppressHydrationWarning
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <input 
                                                id="password" 
                                                name="password" 
                                                tabIndex={2} 
                                                aria-required="true" 
                                                type="password" 
                                                placeholder="Password" 
                                                required 
                                                value={formData.password}
                                                onChange={handleChange}
                                                suppressHydrationWarning
                                            />
                                        </fieldset>
                                        <div className="forgot-pass-wrap">
                                            <label>
                                                <input 
                                                    type="checkbox" 
                                                    name="remember"
                                                    checked={formData.remember}
                                                    onChange={handleChange}
                                                />
                                                <span className="btn-checkbox" />
                                                Remember me
                                            </label>
                                            <Link href="/forgot-password">Forgot your password?</Link>
                                        </div>
                                        <button 
                                            className="tf-button submit" 
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
                                        </button>
                                    </form>
                                    <div className="choose-sign">
                                        Don't have an account? <Link href="/sign-up">Sign up for free</Link>
                                    </div>
                                    <div className="or"><span>or</span></div>
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