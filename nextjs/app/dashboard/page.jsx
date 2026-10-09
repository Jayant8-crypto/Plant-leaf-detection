'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import {
    ActivityIcon,
    ArrowRightIcon,
    Clock3Icon,
    ImageIcon,
    LeafIcon,
    Trash2Icon,
    UploadIcon,
} from 'lucide-react';

export default function DashboardPage() {
    const fileInputRef = useRef(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [error, setError] = useState('');

    const handleImageSelect = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setError('');

        // Allowed file types
        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
        ];

        if (!allowedTypes.includes(file.type)) {
            setError('Please select a JPG, JPEG, or PNG image.');
            event.target.value = '';
            return;
        }

        // Maximum file size: 5 MB
        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            setError('Image size must be less than 5 MB.');
            event.target.value = '';
            return;
        }

        setSelectedImage(file);

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    const removeImage = () => {
        setSelectedImage(null);
        setPreviewUrl('');
        setError('');

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    return (
        <main className="min-h-screen bg-gray-50">

            {/* Header */}
            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">

                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex size-9 items-center justify-center rounded-full bg-green-100 text-xl">
                            🌱
                        </div>

                        <span className="font-semibold text-gray-900">
                            Plant Disease Analyzer
                        </span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <span className="hidden text-sm text-gray-600 sm:block">
                            Welcome back
                        </span>

                        <div className="flex size-9 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
                            U
                        </div>
                    </div>

                </div>
            </header>

            {/* Dashboard */}
            <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">

                {/* Welcome */}
                <div>
                    <p className="text-sm font-medium text-green-600">
                        DASHBOARD
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold text-gray-900">
                        Plant Health Dashboard
                    </h1>

                    <p className="mt-2 max-w-2xl text-gray-600">
                        Upload a cotton leaf image and use your trained CNN
                        model to analyze possible plant diseases.
                    </p>
                </div>

                {/* Upload Card */}
                <div className="mt-8 rounded-2xl border border-green-100 bg-white p-6 shadow-sm md:p-8">

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleImageSelect}
                        className="hidden"
                    />

                    {!selectedImage ? (
                        /* Empty Upload State */
                        <div
                            onClick={openFilePicker}
                            className="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 px-6 py-14 text-center transition hover:border-green-500 hover:bg-green-50/30"
                        >
                            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-50">
                                <UploadIcon className="size-7 text-green-600" />
                            </div>

                            <h2 className="mt-5 text-xl font-semibold text-gray-900">
                                Analyze a Cotton Leaf
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                Upload a clear image of a cotton leaf.
                                Your image will later be processed by
                                the disease detection model.
                            </p>

                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    openFilePicker();
                                }}
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-700"
                            >
                                <UploadIcon className="size-4" />
                                Upload Leaf Image
                            </button>

                            <p className="mt-3 text-xs text-gray-400">
                                JPG, JPEG or PNG • Maximum 5 MB
                            </p>
                        </div>
                    ) : (
                        /* Image Preview */
                        <div className="rounded-xl border border-gray-200 p-5">

                            <div className="flex flex-col gap-6 md:flex-row">

                                {/* Preview */}
                                <div className="relative overflow-hidden rounded-xl bg-gray-100 md:w-1/2">
                                    <img
                                        src={previewUrl}
                                        alt="Selected cotton leaf"
                                        className="h-80 w-full object-contain"
                                    />
                                </div>

                                {/* Image Information */}
                                <div className="flex flex-1 flex-col justify-center">

                                    <div className="flex size-12 items-center justify-center rounded-xl bg-green-50">
                                        <ImageIcon className="size-6 text-green-600" />
                                    </div>

                                    <h2 className="mt-5 text-xl font-semibold text-gray-900">
                                        Image Ready
                                    </h2>

                                    <p className="mt-2 break-all text-sm text-gray-500">
                                        {selectedImage.name}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-400">
                                        {(selectedImage.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-3">

                                        <button
                                            type="button"
                                            onClick={openFilePicker}
                                            className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-green-600 hover:text-green-600"
                                        >
                                            Change Image
                                        </button>

                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="flex items-center gap-2 rounded-full border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                        >
                                            <Trash2Icon className="size-4" />
                                            Remove
                                        </button>

                                    </div>

                                    <button
                                        type="button"
                                        disabled
                                        className="mt-5 flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-gray-300 px-6 py-3 text-sm font-medium text-gray-600"
                                    >
                                        Analyze Image
                                        <ArrowRightIcon className="size-4" />
                                    </button>

                                    <p className="mt-2 text-xs text-gray-400">
                                        Analysis will be enabled after the
                                        backend and CNN model are connected.
                                    </p>

                                </div>

                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                </div>

                {/* Statistics */}
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="rounded-2xl border border-gray-200 bg-white p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-green-50">
                                <ActivityIcon className="size-5 text-green-600" />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Analyses
                                </p>

                                <p className="mt-1 text-2xl font-semibold text-gray-900">
                                    0
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-green-50">
                                <LeafIcon className="size-5 text-green-600" />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Crop
                                </p>

                                <p className="mt-1 text-lg font-semibold text-gray-900">
                                    Cotton
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-green-50">
                                <Clock3Icon className="size-5 text-green-600" />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Recent Analysis
                                </p>

                                <p className="mt-1 text-lg font-semibold text-gray-900">
                                    No analysis yet
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Recent Analyses */}
                <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">

                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Recent Analyses
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Your previous plant analysis results will appear here.
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col items-center justify-center rounded-xl bg-gray-50 px-6 py-12 text-center">

                        <div className="flex size-12 items-center justify-center rounded-full bg-white shadow-sm">
                            <LeafIcon className="size-5 text-gray-400" />
                        </div>

                        <p className="mt-4 font-medium text-gray-700">
                            No analyses yet
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Upload your first cotton leaf image to get started.
                        </p>

                    </div>

                </div>

            </div>
        </main>
    );
}