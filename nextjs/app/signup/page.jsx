import Link from 'next/link';

export default function SignupPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

                {/* Logo */}
                <div className="text-center">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100 text-2xl">
                        🌱
                    </div>

                    <h1 className="mt-4 text-2xl font-semibold text-gray-900">
                        Create Your Account
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Start analyzing plant diseases with AI
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-5">

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

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
                        <label className="text-sm font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            placeholder="Confirm your password"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700"
                    >
                        Create Account
                    </button>

                </form>

                {/* Login */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="font-medium text-green-600 hover:text-green-700"
                    >
                        Login
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