<img width="1920" height="1080" alt="Screenshot (47)" src="https://github.com/user-attachments/assets/d416c7af-775c-4f74-946c-b38e71a91c71" />
<img width="1920" height="1080" alt="Screenshot (44)" src="https://github.com/user-attachments/assets/7d7fc92c-8797-4706-9ffa-15f39c33403f" />
MessageSlack – Real-Time Team Communication Platform

MessageSlack is a real-time team communication platform inspired by Slack and Discord, where users can create workspaces, join teams using invite codes, and communicate instantly through channels.

The application supports workspace management, real-time messaging, notifications, and media sharing.

Features
Authentication

User Sign Up / Sign In

Secure authentication using JWT

Password hashing with bcrypt

Workspace Management

Users can create a workspace

The creator automatically becomes the admin

A unique join code (UUID) is generated for each workspace

Other users can join a workspace using the join code

Channels

Each workspace automatically creates a default channel (general)

Admins can create more channels

Users can communicate within channels

Real-Time Chat

Real-time messaging using Socket.IO

Messages instantly appear to all connected users in the channel

Notifications

When a new user joins a workspace:

A notification job is pushed to a queue

Email notifications are sent using Nodemailer

Background jobs are handled using BullMQ

Redis is used as the message queue backend

File Uploads

Users can send images in chat

Images are stored using AWS S3

Tech Stack
Frontend

React

Axios

Socket.IO Client

Backend

Node.js

Express.js

MongoDB

Authentication & Security

JSON Web Token (JWT)

bcrypt

Real-Time Communication

Socket.IO

Queue & Background Jobs

Redis

BullMQ

File Storage

Amazon S3

Email Service
Workspace Flow

A user signs up or logs in.

The user creates a workspace.

A unique join code (UUID) is generated.

The creator automatically becomes the admin.

A default channel called general is created.

Admin shares the join code with other users.

Other users join the workspace using the code.

Users start real-time chatting in channels.

Nodemailer
