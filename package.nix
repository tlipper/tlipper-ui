{  }:
  allDeps:
    {
      key = { name = "tlipper-ui"; scope = ""; };
      version = "0.0.1";
      nodeBuildInputs = let
        a = allDeps;
      in [
        (a."react-html5-video-editor@^1.2.0")
        (a."redux-devtools@^3.5.0")
        (a."react-player@^2.5.0")
        (a."redux-thunk@^2.3.0")
        (a."snakecase-keys@^3.2.0")
        (a."redux-logger@^3.0.6")
        (a."react-redux@^7.2.0")
        (a."react-dom@latest")
        (a."react-dnd@^11.1.3")
        (a."@material-ui/lab@^4.0.0-alpha.56")
        (a."notistack@^1.0.0")
        (a."@material-ui/icons@^4.9.1")
        (a."redux-throttle@^0.1.1")
        (a."redux@^4.0.5")
        (a."react-paginated-list@^1.0.4")
        (a."react@latest")
        (a."react-tooltip@^4.2.7")
        (a."clsx@latest")
        (a."react-router-dom@^5.2.0")
        (a."react-twitch-embed@https://github.com/yigitozkavci/react-twitch-embed")
        (a."cross-fetch@^3.0.5")
        (a."react-pagination-list@^1.0.8")
        (a."styled-components@^5.1.1")
        (a."react-scripts@latest")
        (a."react-dnd-html5-backend@^11.1.3")
        (a."@material-ui/core@^4.11.0")
        (a."parse-duration@^0.4.4")
        (a."redux-persist@^6.0.0")
        ];
      meta = { description = ""; license = ""; homepage = ""; };
      }
