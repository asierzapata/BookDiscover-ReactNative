import { createStackNavigator } from "react-navigation";
import routes from "../routes";

/* ====================================================== */
/*                       Screens                          */
/* ====================================================== */

<<<<<<< HEAD
import Library from '../screens/library_screen/library_screen'
import Search from '../screens/search_screen/search_screen'
=======
import { LibraryRouter, SearchRouter } from "./library_screens_wrapper";
import Library from "../screens/library_screen/library_screen";
import Search from "../screens/search_screen/search_screen";
import BookDetail from "../screens/book_detail_screen/book_detail_screen";
>>>>>>> 3cbfe3bf05379dc479115e9f5ea2dba93bf98e9c

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export default createStackNavigator(
    {
        Library,
        Search
    },
    {
        initialRouteName: 'Library',
        headerMode: 'none',
    }
)
