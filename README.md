# Burgerino vs Nyan Cat #
Play as Burgerino to evade the famished Nyan Cats.\
**Try it now**: https://burgerino-vs-nyan-cat.tk/


### Project description ###
This project is as strictly front-end project built from scratch. It is mobile and desktop friendly with responsive design. Every thing is cleanly built and features can be added easily and maintainable.


### Notable technologies ###
React, Webpack, Sass

### Performance ###
This app has migrated heavily into Redux without compromising performance while increasing readability.

Good read: https://reactrocket.com/post/react-redux-optimization/

### Note on game development ###
I know this game does not particularly call for game UX/UI design, but that has always peeked my interest as I have worked as a play tester.

#### Example 1 ####
**Problem**: Notice how the Nyan Cat has a rainbow following it. Originally there was a hitbox on it, but it proved frustrating to our play testers.\
**Reason**: The rainbow has a fadded opacity design which gives out a feeling that the rainbow is **NOT** "part" of the Nyan Cat.\
**Solution**: Remove the hitbox instead of solidifying the rainbow since it will make the game easier and prettier.

### Play locally ###

1. Clone the repository
```
git clone <repo>
```

2. Install the dependencies
```
cd Nyan-Cat-React && npm install
```

3. Play (run development server)
```
npm start
```

Alt 3. Run the production build and open dist/index.html
```
npm run build
```

**Easiest way: Use this link**\
https://burgerino-vs-nyan-cat.tk/
