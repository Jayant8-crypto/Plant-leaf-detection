# Cotton Plant Disease Analyzer

This project analyzes cotton leaf images with a trained TensorFlow/Keras CNN. The existing Next.js website provides the upload and prediction interface; FastAPI serves the model.

## Architecture

- `nextjs/`: Next.js 16, React 19, and Tailwind CSS 4 frontend.
- `backend/`: FastAPI service, image preprocessing, class names, and the trained model at `backend/models/cotton_disease_cnn.keras`.
- `docker-compose.yml`: runs the frontend and backend as separate containers.

The model expects RGB images resized to 128x128 pixels and returns four classes in the order listed in `backend/class_names.json`. Image values are passed as pixel values; the model already contains a `Rescaling(1/255)` layer. The model is included in the backend image and is not modified or retrained.

## Prerequisites

- Docker Desktop or Docker Engine with the Compose plugin, with the Docker daemon running.
- At least 4 GB of available memory recommended for the TensorFlow CPU container and image builds.
- A browser for the frontend and a JPG, JPEG, or PNG leaf image no larger than 5 MB for analysis.

The backend image uses Python 3.12 and pinned TensorFlow CPU 2.21.0/Keras 3.15.1 dependencies. The frontend image uses Node.js 22 and the committed npm lockfile. Model loading happens during backend startup; the service is not healthy until the model and class mapping load successfully.

## Step-by-Step Installation

1. Install Docker Desktop for Windows, macOS, or Linux. On Windows, use the WSL 2 backend. Start Docker Desktop and wait for the engine to become ready.

2. Clone this repository and enter its root directory:

   ```sh
   git clone https://github.com/Jayant8-crypto/Plant-leaf-detection.git
   cd Plant-leaf-detection
   ```

3. Confirm Docker Compose is available:

   ```sh
   docker --version
   docker compose version
   ```

4. Optionally create a local environment file from the example:

```powershell
Copy-Item .env.example .env
```

The defaults work for local use; `.env` is ignored by Git. See [Configuration](#configuration) before deploying to another host.

5. Build the images and start both services:

```sh
docker compose up --build -d
docker compose ps
```

The first build downloads the TensorFlow CPU package (about 274 MB) and may take several minutes depending on your connection. At least 4 GB of available memory is recommended.

6. Wait until both services show `healthy`/`Up` in `docker compose ps`, then open the website at <http://localhost:3000>. The backend is at <http://localhost:8000>; health is <http://localhost:8000/health> and interactive API docs are at <http://localhost:8000/docs>.

7. To start already-created containers after stopping them, run:

   ```sh
   docker compose start
   ```

8. To stop the containers but keep them for later, run `docker compose stop`. To stop and remove the containers and network, run `docker compose down`; images and source files are retained.

View service status and logs:

```sh
docker compose ps
docker compose logs -f
```

The model is copied into the backend image, so no model volume or separate download is needed.

## Test the API

Check readiness:

```sh
curl http://localhost:8000/health
```

Submit a leaf image using the required multipart field `file` (replace the path with an image on your computer):

```sh
curl.exe -X POST http://localhost:8000/api/analyze -F "file=@C:\path\to\leaf.jpg"
```

A successful response contains `prediction.disease`, `prediction.confidence`, and `prediction.class_index`. Unsupported file types, invalid image data, and files larger than 5 MB are rejected with a client error.

## Configuration

The root `.env.example` lists the supported Compose variables:

- `NEXT_PUBLIC_API_BASE_URL`: browser-accessible API origin. Defaults to `http://localhost:8000` for local use. This value is compiled into the frontend image, so rebuild the frontend after changing it.
- `CORS_ORIGINS`: comma-separated frontend origins allowed by the API. Defaults to `http://localhost:3000`.
- `BACKEND_BIND_ADDRESS`: host interface for the published backend port. Defaults to `127.0.0.1` so the API is not exposed to the network by default.

Do not set the browser API URL to the Compose service name `backend`; browsers cannot resolve container-only service names. For deployment, set `NEXT_PUBLIC_API_BASE_URL` to the public HTTPS API origin and set `CORS_ORIGINS` to the deployed frontend origin before building/starting the services.

## Local Development Without Docker

Install the pinned Python requirements in a Python 3.12 environment, then start the API from `backend/`:

```sh
python -m pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

In another terminal, start the existing frontend from `nextjs/`:

```sh
npm ci
npm run dev
```

The frontend defaults to `http://localhost:8000` for the API. Set `NEXT_PUBLIC_API_BASE_URL` in the frontend environment when using another API origin.

## Troubleshooting

- If Compose cannot connect to Docker, start Docker Desktop and wait for its Linux engine to become ready, then retry `docker compose up --build`.
- If the backend is unhealthy, inspect `docker compose logs backend`. Startup validates the model file, 128x128 RGB input shape, output count, and class mapping.
- If the browser reports a network or CORS error, verify the public `NEXT_PUBLIC_API_BASE_URL`, the backend port/reverse proxy, and that the frontend origin appears in `CORS_ORIGINS`; rebuild the frontend after changing its URL.
- If an upload fails, use a valid JPG, JPEG, or PNG image at or below 5 MB.

## Production Notes

Both images run as non-root users. The frontend uses a multi-stage production build and Next.js standalone output. The backend is CPU-only and is published on loopback by default. For deployment, terminate HTTPS at a reverse proxy, expose the API only through that proxy, use the public API URL and matching CORS origin, and configure network binding/firewall rules deliberately. Do not put secrets in the frontend environment or commit a `.env` file.

The customized website template is subject to the terms in [LICENSE.txt](LICENSE.txt).
