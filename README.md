# Caompus Navigation Prototype

The intention for this repo is to develop a prototype for Campus Navigation.

We are using the <a href="https://developers.google.com/maps/documentation/javascript/overview">Maps Javascript API</a>.
Github hosts a chosen branch at <a href="https://kevinddchen.github.io/sdk_sandbox">kevinddchen.github.io/gmaps_sandbox</a>. 

- <a href="index.html">index.html</a> contains the basic webpage---very simple, nothing much to see here.
- <a href="index.js">index.js</a> contains the Javascript that creates the map.

Some development guidelines:
- Develop features on new branches. The site can host any branch, not just `main`.
- Host locally to test out features: run `python3 -m http.server` on command line in your local directory, and then navigate to `localhost:8000` in your web browser. Remember to <em>hard refresh</em> to reload your JS!
- Try not to commit directly to `main`. We will keep `main` as a working skeleton for development.
