Firebase setup and rules

1) Quick dev steps

- Open Firebase Console → Project → Authentication → Sign-in method and enable Email/Password.
- Open Firebase Console → Firestore Database and create a database (test mode ok for development).
- Add `localhost` to Authentication → Authorized domains.

2) Deploy rules from repo

- Install firebase-tools and login:
  - npm i -g firebase-tools
  - firebase login
- Initialize (only once) in this project if not already:
  - firebase init firestore
- Deploy rules from `firestore.rules` in the repo:
  - firebase deploy --only firestore:rules

3) Notes
- The app stores user profiles at `users_uid/{uid}` and carts at `carts/{uid}`.
- Orders include the `uid` field so rules can restrict read access.
