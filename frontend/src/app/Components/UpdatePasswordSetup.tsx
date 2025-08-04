import React, { useState } from 'react';
import axios from 'axios';
import { i } from 'framer-motion/client';
interface UpdatePasswordSetupProps {
  email: string;
}

const UpdatePasswordSetup: React.FC<UpdatePasswordSetupProps> = ({ email }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [samePasswordError, setsamePasswordError] = React.useState("");
  const [success, setSuccess] = useState('');

  interface LoginRequest {
    email: string;
    password: string;
  }

  interface UpdatePasswordResponse {
    success: boolean;
    message: string;
    email: string;
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccess('');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setSuccess('');
      return;
    }

    // Placeholder: Call your updatePassword API here
    console.log('Updating password for:', email);
    console.log('New password:', password);

    setError('');
    setSuccess('Password successfully updated!');
  };


  const updatePassword = async (
    email: string,
    password: string
  ): Promise<UpdatePasswordResponse | null> => {
    if (password != confirmPassword) {
      setsamePasswordError("Password and Same Password Should not match");

    } else {
      setsamePasswordError("");
    }

    try {
      const requestData: LoginRequest = {
        email,
        password,
      };

      const response = await axios.post<UpdatePasswordResponse>(
        'http://localhost:8080/api/auth/updatePassword',
        requestData
      );

      return response.data;
    } catch (error) {
      console.error('Error updating password:', error);
      return null;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Set New Password</h2>
      <p className="text-gray-600 mb-2">Email: <strong>{email}</strong></p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full p-2 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Set Password
        </button>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        {samePasswordError && <p className='text-red-600'>{samePasswordError}</p>}
      </form>
    </div>
  );
};

export default UpdatePasswordSetup;
