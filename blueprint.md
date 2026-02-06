
# Project Blueprint: AI-Powered Health and Fitness App

## Overview

This is a web-based health and fitness application designed to provide users with a comprehensive set of tools for tracking their fitness and nutrition. The app is built using modern, framework-less web technologies (HTML, CSS, JavaScript) and leverages Web Components for a modular and maintainable architecture. It is designed to be a "bold" and "intuitive" user experience, with a focus on modern design principles and accessibility.

## Implemented Features & Design

### Core Architecture

*   **Framework-less:** The application is built without any front-end frameworks, using vanilla JavaScript, HTML, and CSS.
*   **Web Components:** The UI is built with Web Components, ensuring encapsulation and reusability. Each feature is a custom element (e.g., `<main-navigation>`, `<feature-section>`, etc.).
*   **ES Modules:** JavaScript is organized into modules for better code management.
*   **Modern CSS:** The application uses modern CSS features like CSS Variables for theming, `clamp()` for responsive typography, and advanced selectors.

### Visual Design

*   **Aesthetics:** A modern and clean design with a focus on readability and visual appeal. The color palette is based on a vibrant accent color with a clean, light theme.
*   **Typography:** The "Poppins" font is used for a modern and friendly look.
*   **Iconography:** Material Symbols are used to provide intuitive visual cues.
*   **Interactivity:** Interactive elements like buttons and navigation links have a "glow" effect on hover to provide visual feedback.

### Implemented Features

*   **Landing Page (`index.html`):** A welcoming landing page that introduces the app and its features.
*   **Main Application (`app.html`):** The main application interface, which includes:
    *   **Main Navigation:** A sticky navigation bar that allows users to switch between different feature sections.
    *   **Dashboard:** A central view that provides a summary of the user's progress (e.g., nutrition and fitness goals).
    *   **About Me:** A section for users to input their height and weight to calculate their BMI.
    *   **Nutrition Tracking:** A feature that allows users to upload a photo to get an estimated nutritional analysis of their meal.
    *   **Fitness Goal Planning:** A tool for users to select a fitness goal and receive a personalized plan.
    *   **Community Board:** A forum where users can post and interact with each other.
    *   **AI Health Chat:** A chat interface for users to interact with an AI assistant and request to speak with specialists (Doctor, Coach, Dietitian).
*   **Admin Page (`admin.html`):** A separate page for administrative functions.

## Current Task: Refactor AI Health Chat

### Plan

1.  **Redesign Chat Interface:** Remove the initial role selection and add buttons within the chat input area to "tag" specialists.
2.  **Add Icons:** Use Material Symbols to represent the Doctor, Coach, and Dietitian for a more intuitive user interface.
3.  **Implement Chat Logic:** Update the `AIHealthChat` component to handle sending and receiving messages, displaying a confirmation when a specialist is requested, and showing mock responses.
4.  **Fix Rendering Issue:** Correct the typo in `app.html` from `</fseature-section>` to `</feature-section>` to ensure the AI Health Chat and other components render correctly.

