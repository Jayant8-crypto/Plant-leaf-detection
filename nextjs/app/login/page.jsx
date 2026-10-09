import Link from 'next/link';

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

                {/* Logo */}
                <div className="text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100 text-2xl">
                        🌱
                    </div>

                    <h1 className="mt-4 text-2xl font-semibold text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Login to continue using Plant Disease Analyzer
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-5">

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                                Password
                            </label>

                            <button
                                type="button"
                                className="text-sm text-green-600 hover:text-green-700"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700"
                    >
                        Login
                    </button>

                </form>

                {/* Signup */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link
                        href="/signup"
                        className="font-medium text-green-600 hover:text-green-700"
                    >
                        Create an account
                    </Link>
                </p>

                {/* Back */}
                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="text-sm text-gray-500 hover:text-gray-800"
                    >
                        ← Back to home
                    </Link>
                </div>

            </div>
        </main>
    );
}