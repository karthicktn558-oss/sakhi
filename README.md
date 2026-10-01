# Namma Seva AI

Namma Seva AI is a small multilingual guide to government services. Its guidance is sample information, not official eligibility or application advice.

Your multilingual guide to government services

## Run on Windows

1. Open PowerShell in this folder.
2. Create and activate a virtual environment:

   ```powershell
   py -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

3. Install dependencies:

   ```powershell
   python -m pip install -r requirements.txt
   ```

4. Start the app:

   ```powershell
   python app.py
   ```

5. Open http://127.0.0.1:5000 in a browser.

The app works without an API key using local Tamil keyword matching. To enable Gemini service classification, set the key in PowerShell before starting the app:

```powershell
$env:GEMINI_API_KEY = "your-key"
python app.py
```

The key is read only by the Flask backend. Gemini is used only to classify the request; all guidance comes from the clearly labeled sample data in `app.py`. If the API is unavailable, local matching is used instead. You can optionally set `GEMINI_MODEL` to select a model.

Voice input uses browser speech recognition in supported browsers and may require microphone permission and an internet connection. Tamil speech playback depends on the voices installed in the browser or operating system.

## Disclaimer

This is a prototype. Service details, eligibility, documents, and application steps can change and vary by location. Confirm current requirements with the relevant government office or service center. Do not enter sensitive personal information.