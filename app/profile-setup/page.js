'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProfileSetup() {
  const [profileImage, setProfileImage] = useState('/default-profile.png'); // Default image
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [mobile, setMobile] = useState('');
  const router = useRouter();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setProfileImage('/default-profile.png');
  };

  const handleSaveProfile = () => {
    // console.log('Profile Saved:', { firstName, lastName, gender, dob, address1, address2, pincode, city, state, country, mobile, email });
    router.push('/dashboard'); // Redirect to dashboard
  };

  return (
    <section className="min-h-screen p-4 overflow-auto flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[600px]">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6">Complete Your Profile</h2>

        {/* Profile Image*/}
        <div className="flex items-center justify-center mb-6">
          {/*  Profile Image */}
          <div className="flex flex-col items-center">
            <a href='' onClick={handleRemoveImage}>
            <Image onClick={handleImageUpload} src={profileImage} alt="Profile" width={100} height={100} className="rounded-full border border-gray-300" />
            </a>
          </div>
        </div>

        {/* Personal Info Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Personal Info</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {/* <input type="text" placeholder="First Name" className="w-full p-3 border border-gray-300 rounded-lg" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="Last Name" className="w-full p-3 border border-gray-300 rounded-lg" value={lastName} onChange={(e) => setLastName(e.target.value)} /> */}
            <select className="w-full p-3 border border-gray-300 rounded-lg" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input type="date" className="w-full p-3 border border-gray-300 rounded-lg" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Address</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <input type="text" placeholder="Address Line 1" className="w-full p-3 border border-gray-300 rounded-lg" value={address1} onChange={(e) => setAddress1(e.target.value)} />
            <input type="text" placeholder="Address Line 2" className="w-full p-3 border border-gray-300 rounded-lg" value={address2} onChange={(e) => setAddress2(e.target.value)} />
            <input type="text" placeholder="Pincode" className="w-full p-3 border border-gray-300 rounded-lg" value={pincode} onChange={(e) => setPincode(e.target.value)} />
            <input type="text" placeholder="City" className="w-full p-3 border border-gray-300 rounded-lg" value={city} onChange={(e) => setCity(e.target.value)} />
            <input type="text" placeholder="State" className="w-full p-3 border border-gray-300 rounded-lg" value={state} onChange={(e) => setState(e.target.value)} />
            <input type="text" placeholder="Country" className="w-full p-3 border border-gray-300 rounded-lg" value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Contact</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <input type="text" placeholder="Mobile Number" className="w-full p-3 border border-gray-300 rounded-lg" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            {/* <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
          </div>
        </div>

        {/* Save & Proceed Button */}
        <button className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700" onClick={handleSaveProfile}>
          Save & Proceed
        </button>
      </div>
    </section>
  );
}
