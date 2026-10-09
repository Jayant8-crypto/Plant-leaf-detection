'use client';

import { useRef, useState } from 'react';
import {
    ImageIcon,
    UploadIcon,
    XIcon,
    ArrowRightIcon,
    Loader2Icon,
} from 'lucide-react';

const API_BASE_URL = (
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
).replace(/\/$/, '');

export default function CottonAnalysisSection() {
    const fileInputRef = useRef(null);

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    // -----------------------------------------
    // Handle selected image
    // -----------------------------------------
    const handleFile = (file) => {
        if (!file) return;

        setError('');
        setResult(null);

        const allowedTypes = [
            'image/jpeg',
            'image/png',
        ];

        if (!allowedTypes.includes(file.type)) {
            setError('Please upload a JPG, JPEG, or PNG image.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('Image size must be less than 5 MB.');
            return;
        }

        setImage(file);

        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    };

    // -----------------------------------------
    // File input change
    // -----------------------------------------
    const handleInputChange = (event) => {
        const file = event.target.files?.[0];

        if (file) {
            handleFile(file);
        }
    };

    // -----------------------------------------
    // Remove selected image
    // -----------------------------------------
    const removeImage = () => {
        setImage(null);
        setPreview('');
        setError('');
        setResult(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // -----------------------------------------
    // Analyze image using FastAPI + CNN
    // -----------------------------------------
    const analyzeImage = async () => {
        if (!image) {
            setError('Please select an image first.');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const formData = new FormData();

            formData.append('file', image);

            const response = await fetch(
                `${API_BASE_URL}/api/analyze`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail || 'Analysis failed.'
                );
            }

            setResult(data);
        } catch (err) {
            setError(
                err.message ||
                    'Unable to connect to the analysis server.'
            );
        } finally {
            setLoading(false);
        }
    };

    // -----------------------------------------
    // Format CNN class name
    // -----------------------------------------
    const formatDiseaseName = (name) => {
        if (!name) return 'Unknown';

        return name
            .replaceAll('_', ' ')
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
    };

    return (
        <section
            id="analyze"
            className="mx-auto mt-24 max-w-6xl px-4 py-20"
        >
            {/* Heading */}
            <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
                    Plant Analysis
                </p>

                <h2 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
                    Analyze Your Cotton Leaf
                </h2>

                <p className="mt-4 text-gray-600">
                    Upload a clear cotton leaf image and get a
                    disease prediction from our trained CNN model.
                </p>
            </div>

            {/* Analysis Box */}
            <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-8">

                {/* Hidden File Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleInputChange}
                    className="hidden"
                />

                {/* -----------------------------------------
                    Upload Area
                ----------------------------------------- */}
                {!image ? (
                    <div
                        onClick={() =>
                            fileInputRef.current?.click()
                        }
                        className="cursor-pointer rounded-2xl border-2 border-dashed border-gray-300 px-6 py-16 text-center transition hover:border-green-500 hover:bg-green-50/30"
                    >
                        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-50">
                            <UploadIcon className="size-7 text-green-600" />
                        </div>

                        <h3 className="mt-5 text-xl font-semibold text-gray-900">
                            Upload Cotton Leaf Image
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                            Upload a clear image of a cotton leaf
                            to analyze possible diseases.
                        </p>

                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                fileInputRef.current?.click();
                            }}
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-700"
                        >
                            <UploadIcon className="size-4" />
                            Choose Image
                        </button>

                        <p className="mt-4 text-xs text-gray-400">
                            JPG, JPEG or PNG • Maximum 5 MB
                        </p>
                    </div>
                ) : (
                    /* -----------------------------------------
                       Selected Image
                    ----------------------------------------- */
                    <div className="grid gap-8 md:grid-cols-2">

                        {/* Image Preview */}
                        <div className="overflow-hidden rounded-2xl bg-gray-100">
                            <img
                                src={preview}
                                alt="Selected cotton leaf"
                                className="h-80 w-full object-contain"
                            />
                        </div>

                        {/* Image Controls */}
                        <div className="flex flex-col justify-center">

                            <div className="flex size-12 items-center justify-center rounded-xl bg-green-50">
                                <ImageIcon className="size-6 text-green-600" />
                            </div>

                            <h3 className="mt-5 text-xl font-semibold text-gray-900">
                                Image Ready
                            </h3>

                            <p className="mt-2 break-all text-sm text-gray-500">
                                {image.name}
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                {(image.size / (1024 * 1024)).toFixed(2)} MB
                            </p>

                            {/* Change / Remove */}
                            <div className="mt-6 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-green-600 hover:text-green-600"
                                >
                                    Change
                                </button>

                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="flex items-center gap-2 rounded-full border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                >
                                    <XIcon className="size-4" />
                                    Remove
                                </button>
                            </div>

                            {/* Analyze Button */}
                            <button
                                type="button"
                                onClick={analyzeImage}
                                disabled={loading}
                                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <Loader2Icon className="size-4 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        Analyze Leaf
                                        <ArrowRightIcon className="size-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* -----------------------------------------
                    Error
                ----------------------------------------- */}
                {error && (
                    <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* -----------------------------------------
                    CNN Result
                ----------------------------------------- */}
                {result && (
                    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
                        <h3 className="text-center text-2xl font-semibold capitalize text-gray-900">
                            {formatDiseaseName(result.prediction.disease)}
                        </h3>
                    </div>
                )}
            </div>
        </section>
    );
}