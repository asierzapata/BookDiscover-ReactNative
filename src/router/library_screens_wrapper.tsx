import { createStackNavigator } from 'react-navigation'

/* ====================================================== */
/*                       Screens                          */
/* ====================================================== */

import Library from '../screens/library_screen/library_screen'
import Search from '../screens/search_screen/search_screen'
import BookDetail from '../screens/book_detail_screen/book_detail_screen';

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */


/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export const LibraryRouter = createStackNavigator(
    {
        Library,
        BookDetail: {
            screen: BookDetail,
            header: null,
            navigationOptions: () => ({

            })
        }
    },
    {
        initialRouteName: 'Library',
        headerMode: 'none',
        mode: 'modal'
    }
)

export const SearchRouter = createStackNavigator(
    {
        Search,
        BookDetail: {
            screen: BookDetail,
            header: null,
            navigationOptions: () => ({

            })
        }
    },
    {
        initialRouteName: 'Search',
        headerMode: 'none',
        mode: 'modal'
    }
)

