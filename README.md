# Quiz App

This is a simple quiz app built with JavaScript, HTML, and CSS.

## Features

* Fetches 10 multiple choice questions from the Open Trivia DB API
* Randomizes the order of the answers for each question
* Keeps track of the user's score and displays it at the end of the quiz
* Includes a timer that counts down from 60 seconds
* Responsive design that works on different screen sizes

## How to Use

1. Clone or download the repository
2. Open index.html in your web browser
3. Answer the questions to the best of your ability within the given time frame
4. Click the "Submit" button to see your score and the correct answers

## API Reference

This app uses the [Open Trivia DB API](https://opentdb.com/api_config.php) to fetch the quiz questions. You can customize the API call by changing the `amount` and `category` parameters in the `getQuestions` function.

