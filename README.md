# Getting started

### client / server

- npm install
- npm run dev

### db / prisma/sqlite

- npx prisma migrate dev

## Overview

The next.js client consists of Homepage, create quiz page and quiz page

- Homepage uses getStaticProps to populate the quizs currently available from the database.
- useQuery is used to continually regenerate this data, while also providing a better user experience by showing the state of the data. e.g. loading, error , success.
- Each quiz has an onClick event which will use next/router to reroute to the quiz page.
- The quiz page then uses the quiz.id from the url.query to define the single quiz object.
- The useState and useEffect are then used to track the users progress on the quiz, including how many guesses they've made, are the guesses correct and has the quiz been completed.
- The user can also choose to create their own quiz which uses Quiz and Question schemas to fetch "POST" to the next.js api to create quiz models into the sqlite database.

# Challenges

### prisma

I have never used prisma before and found this to be an amazing developer experience once i finished traversing the setup issues.
such as , documentation demonstrating prisma1 schema configuration which returned errors, and trying to define an array of Question models inside of a Quiz schema.

### Tailwind

Again the worst part of tailwind for me was understanding the setup. The reason for this is because actually using tailwind "while i expect it will take some time to get in the swing of absolute best practices" is a brilliant developer experience.

### useQuery

This is not something i have actually used before within my react or next projects. I think this is probably because i have never come across a problem where a suggested solution has been proposed with useQuery.

Initially i really could not see the benefit over using a simple setup with redux-toolkit and the usual state management within react, but now i have had some time to research i can see the massive potential and will be working hard to make sure i really get this under my belt. I decided to keep the api routes similar to using an express MVC setup which means i was essentially doing the full fetch requests within the useQuery calls. Being a small application with not many features this was fine, but i really want to implement this into my bigger projects so i can make use of the beautiful tiny readable pieces of code it leaves you with.

# Retrospect

I really appreciate that you sent me this challenge project, honestly, thank you for giving me the time of day!

I have touched on typescript before but it is not something i continually use within my own projects. I have never touched tailwind in this configuration which enabled me to see a lot of other methods of utilising it to get consistent and fast designs. Prisma was completely new to me and i feel like ive been missing out after having that run successfully.

I will definitely be using all of this moving forward and i sincerely thank whoever setup this challenge for pushing me to learn.

I hope that the research and implementation i used to deliver this project was enough to show my capabilities and doesnt reflect negatively on me. im sure in a few weeks i will read back through the code and fill myself with regret.

Thank you, Tom Hacker.

### SideNote

I would never include environment variables in production....
