import { createStackNavigator } from "react-navigation";
import routes from "../routes";

/* ====================================================== */
/*                       Screens                          */
/* ====================================================== */

import { LibraryRouter, SearchRouter } from "./library_screens_wrapper";
import Library from "../screens/library_screen/library_screen";
import Search from "../screens/search_screen/search_screen";
import BookDetail from "../screens/book_detail_screen/book_detail_screen";

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export default createStackNavigator(
  {
    Library: LibraryRouter,
    Search: SearchRouter,
    BookDetail: {
      screen: BookDetail,
      header: null,
      navigationOptions: () => ({})
    }
  },
  {
    initialRouteName: routes.library(),
    headerMode: "none"
  }
);
