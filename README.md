# Weekend-Project-3

# Story Telling App with Character Management

This project is a Next.js application that allows users to create and manage characters for a story, and then generate a story using those characters with an LLM (Large Language Model) through Ollama.

## Features

* **Character Management:**
    * Users can add, edit, and delete characters.
    * Each character has a name, description, and personality.
    * Characters are displayed in a table format.
* **Story Generation:**
    * Users can generate a story based on the created characters.
    * The application uses Ollama to interact with an LLM.
    * The prompt is customized to include the user-created characters.
* **Character Role Summary:**
    * After generating the story, the application provides a summary of each character's role in the narrative.
* **LLM Model Experimentation:**
    * Ability to test and compare different LLM models for story generation.
    * Experiments with context window sizes.
    * Testing with models of varying sizes.

## Technologies

* Next.js (React framework)
* TypeScript
* Tailwind CSS (for styling)
* Ollama (for LLM interaction)

## Setup

1.  **Install Ollama:**
    * Download and install Ollama from [ollama.ai](https://ollama.ai/).
    * Pull the desired model. For example, to use Mistral: `ollama pull mistral`

2.  **Clone the Repository:**
    ```bash
    git clone [repository URL]
    cd story-telling-app
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Run the Application:**
    ```bash
    npm run dev
    ```

5.  **Access the Application:**
    * Open your browser and navigate to `http://localhost:3000`.

## Usage

1.  **Add Characters:**
    * Use the character form to add new characters.
    * Enter the character's name, description, and personality.
2.  **Edit Characters:**
    * Click the edit button next to a character to modify its details.
3.  **Delete Characters:**
    * Click the delete button next to a character to remove it.
4.  **Generate Story:**
    * Select the genre and tone for the story.
    * Click the "Generate Story" button.
    * The generated story and character role summaries will be displayed.

## LLM Model Experimentation

* **Model Selection:**
    * Modify the `model` field in `services/ollamaService.ts` to test different models.
    * Example: change `'mistral:latest'` to `'llama2:latest'`.
* **Context Window:**
    * To experiment with context windows, adjust the prompt's length (add more characters, or generate longer character descriptions) and observe how the model handles it.
    * Some models may forget earlier characters in the prompt if the context window is exceeded.
* **Model Size:**
    * Test smaller and larger models (if your hardware permits) and compare the quality and coherence of the generated stories.
    * Note how larger models may provide more detailed and coherent responses.

## Future Improvements

* Implement a more advanced UI for character management.
* Add more customization options for story generation.
* Allow users to save and load stories.
* Implement streaming for the story generation.
* Add better error handling and user feedback.

## Notes

* Ensure Ollama is running before starting the application.
* Model performance may vary depending on your hardware.
* This project is intended for experimental purposes.
