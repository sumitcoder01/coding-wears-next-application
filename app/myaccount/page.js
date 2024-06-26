"use client"
import Image from "next/image";
import Link from 'next/link';
import { BASE_URL } from "@/confiq/apiurl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaUserEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import UpdateUser from "../components/UpdateUser";
import Modal from "../components/Modal";
import UserAccountSkeleton from "../components/skeletons/UserAccountSkeleton";
import { UserIcon } from "../components/icons/UserIcon";
import { EmailIcon } from "../components/icons/EmailIcon";
import { DateIcon } from "../components/icons/DateIcon";
import { PasswordIcon } from "../components/icons/PasswordIcon";
import ProfileImage from '../../public/image/profile.jpg'

export const dynamic = 'force-dynamic';

export default function MyAccount() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: '',
    email: '',
    createdAt: '',
    updatedAt: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const getUser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('auth-token'),
        },
      });
      const response = await res.json();
      if (response.success) {
        let { name, email, createdAt, updatedAt } = response.user;
        setUser({
          name,
          email,
          createdAt: formattedDate(createdAt),
          updatedAt: formattedDate(updatedAt)
        })
      }
      else {
        toast.error(response.error);
        router.push('/')
      }
    } catch (error) {
      console.log("Server Error!");
    }
    setLoading(false);
  };
  const formattedDate = (inputDate) => {
    const date = new Date(inputDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  useEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      router.push('/');
    }
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])
  return (
    <div>
      {loading ? <UserAccountSkeleton /> :
        <div className="container mx-auto mt-8">
          <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">My Account</h2>
              <div className="relative w-20 h-20">
                <Image
                  src={ProfileImage}
                  alt="User Profile"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="text-sm text-gray-600 flex items-center gap-1"><UserIcon /><span>Name</span></label>
                <p className="font-medium text-gray-800">{user.name}</p>
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-600 flex items-center gap-1"><EmailIcon /><span>Email</span></label>
                <p className="font-medium text-gray-800">{user.email}</p>
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-600 flex items-center gap-1"><DateIcon /><span>Created At</span></label>
                <p className="font-medium text-gray-800">{user.createdAt}</p>
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-600 flex items-center gap-1"><DateIcon /><span>Updated At</span></label>
                <p className="font-medium text-gray-800">{user.updatedAt}</p>
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-600 flex gap-1"><PasswordIcon /><span>Password</span></label>
                <div className="flex items-center">
                  <p className="font-medium text-gray-800">{'**************'}</p>
                  <Link className="ml-2 text-blue-500 hover:underline focus:outline-none" href="/forgot">
                    Forgot Password?
                  </Link>
                </div>
                <p onClick={openModal} className='font-medium mt-3 text-pink-600'><FaUserEdit /></p>
              </div>
            </div>
          </div>
          <Modal isOpen={isModalOpen} closeModal={closeModal}>
            <UpdateUser user={user} setUser={setUser} closeModal={closeModal} />
          </Modal>
        </div>
      }
    </div>
  )
}