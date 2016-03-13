Angular2 example: devserver, production build, using webpack
===


Features
---

- Top-level routes, child routes
- Intercepting redirects (e.g. if data is not saved)
- Build the app for production
  - chunk
  - minify (uglify)
  - copy
  - ts lint
- Dev server to develop

Run
---

```
npm install
npm run server:dev
```


Structure
---

### Store all components at one level

Including a main component
  - /app/my-app/my-app.ts
  - /app/my-dashboard/my-dashboard.ts
  - /app/my-etc/my-etc.ts

Pros:
- move components by a DOM tree
  - without moving corresponding folders
  - without changing paths to other modules (services, helpers, etc.)
- use the same components in different places (canonical paths)
  - theme/nature/book123
  - author/books/book123


### Name convention for components

- lower case
- two or more words, separated by dash (one word only for HTML tags)
- start with some specific word (2-3 letters), like
  - my-app for example apps
  - md-button for material design components
  - bsp-carousel for bootstrap modules
  - etc-...


### Exporting

- MyApp, MyHeroList, MyHeroDetail, MdButton - for components
- HeroSvc, OtherSvc - for services
- InitCapsPipe, SomeTransformPipe - for pipes
- Hero, User, Company - for classes (interfaces)
(usually models retrieves from a server - use it instead of re-creation on a client side)