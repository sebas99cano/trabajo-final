import { useContext, useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import AuthService from "@/api/AuthService";
import { AuthContext, ThemeContext } from "@/core/context";
import { routes } from "@/routes";
import es_ES from "antd/es/locale/es_ES";

const useApp = () => {
  const [authState, authDispatch] = useContext(AuthContext);
  const [themeState, themeDispatch] = useContext(ThemeContext);
  const { generalDictionary } = themeState;
  const [authLoading, setAuthLoading] = useState(false);
  const [configProvider] = useState({ locale: es_ES, direction: "ltr" });
  const navigate = useNavigate();

  useEffect(() => {
    setAuthLoading(true);
    const sessionInfo = JSON.parse(sessionStorage.getItem("storage"));
    if (sessionInfo && sessionInfo.uid) {
      AuthService.getUser(sessionInfo.uid)
        .then((response) => {
          authDispatch({
            type: "LOGIN_USER",
            payload: response,
          });
          themeDispatch({
            type: response.themePreference,
          });
          setAuthLoading(false);
        })
        .catch((error) => {
          setAuthLoading(false);
          console.error("error", error);
        });
    } else {
      setAuthLoading(false);
      sessionStorage.removeItem("storage");
      authDispatch({
        type: "LOGOUT_USER",
      });
    }
  }, []);

  const getRoutes = (routes) => {
    return routes.map((route) => {
      if (route.children && route.children.length > 0) {
        return route.children.map((children) => (
          <Route
            path={children.path}
            element={children.element}
            key={route.name}
          />
        ));
      } else {
        return (
          <Route path={route.path} element={route.element} key={route.name} />
        );
      }
    });
  };

  const getItem = (label, key, icon, children, disabled, hidden, onClick) => {
    return {
      label,
      key,
      icon,
      children,
      disabled,
      hidden,
      onClick,
    };
  };

  const generateList = (routes) => {
    if (routes && routes.length) {
      return routes.map((route) =>
        getItem(
          route.text,
          route.name,
          route.icon,
          generateList(route.children),
          route.disabled,
          route.isHidden,
          () => (route.path ? navigate(route.path) : null)
        )
      );
    } else {
      return null;
    }
  };

  const items = generateList(routes({ generalDictionary }));
  const routesList = getRoutes(routes({ generalDictionary }));

  return { authState, authLoading, items, routesList, configProvider };
};

export default useApp;
