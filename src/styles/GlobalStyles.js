// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f8f5f4;
  }
  
  * {
    box-sizing: border-box;
  }

  .main-grid {
    display: flex;
    justify-content: center; /* Center columns horizontally */
    width: 70%; /* Set width to 70% */
    padding: 20px;
    background-color: #f0f0f0; /* Light gray background */
    border-radius: 10px; /* Rounded edges */
    margin: 0 auto; /* Center the grid horizontally */
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Space between boxes */
    flex: 1; /* Ensures the columns take equal width */
    align-items: center; /* Center content horizontally */
  }

  .box {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
    text-align: center; /* Center text horizontally */
    width: 100%; /* Make boxes full width of their container */
  }

  .box-max {
    width: 100%;
    top:-100%; /* Max width for the first and last box in the first column */
  }

  .box-row {
    display: flex;
    gap: 10px; /* Space between the two boxes in the row */
    justify-content: center; /* Center the row horizontally */
  width: 100%;
    }

  .box-half {
    flex: 1; /* Each box takes 50% width of the row */
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
    text-align: center; /* Center text horizontally */
    width: 100%; /* Ensure boxes fill their container */
  }

  .column-half-container {
    display: flex;
    gap: 20px; /* Space between the two inner columns */
    justify-content: center; /* Center the inner columns horizontally */
  }

  .column-half {
    display: flex;
    flex-direction: column;
    gap: 10px; /* Space between the two boxes */
    flex: 1;
    align-items: center; /* Center content horizontally */
  }

  .box-40 {
    flex: 0 0 65%; /* Box takes 40% of the column's height */
  }

  .box-60 {
    flex: 0 0 120%; /* Box takes 60% of the column's height */
  }

  h3 {
    font-size: 1.2rem;
    margin: 10px 0;
  }

  p {
    font-size: 0.9rem;
    color: #555;
  }
  
.box.box-max1 {
  background-color: pink; /* White background */
  border-radius: 10px; /* Rounded edges */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  padding: 20px; /* Add padding inside the box */
  text-align: center; /* Center text horizontally */
  width: 65%; /* Full width of its container */
  max-width: 100%; /* Ensure it does not exceed the container width */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
margin-top:16vh;
  }

/* Optional: Add additional styles for headers and paragraphs inside the box */
.box-max h3 {
  font-size: 1.5rem; /* Larger font size for the title */
  margin-bottom: 15px; /* Space below the title */
  color: #333; /* Darker color for better readability */
}

.box-max p {
  font-size: 1rem; /* Standard font size for the description */
  color: #666; /* Slightly lighter color for the description text */
}

`;

export default GlobalStyles;
