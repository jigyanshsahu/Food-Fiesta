import logo from './logo.png'
import search from './search.png'
import menu1 from './254056795-classic-margherita-pizzand.webp'
import menu2 from './a-plate-of-traditional-italian-dish-pasta-.webp'
import menu3 from './Slow-cooker-beef-stew.webp'
import menu4 from './cheese-garlic-naan.webp'
import menu5 from './cheesy-tokbokki-korean-traditional-food.webp'
import menu6 from './burger.webp'
import menu7 from './HMONG-Potluck-Chopped-Salad.webp'
import menu8 from './biryani_icon.png'
import menu9 from './steak_icon.png'
import menu10 from './paneer_icon.png'

import shoppingcart from './shopping-cart.png'
import add from './add.png'
import plusgreen from './plusgreen.png'
import minusred from './minusred.png'
import facebook from './facebook-new.webp'
import linkdin from './linkdinlogo.webp'
import x from './xlogo.webp'
import pla from './getitonpla.png'
import aplo from './applestore.webp'
import cancel from './cancel.png'
import use from './user.webp'
import bag from './shoppingbag.png'
import lout  from './logout.png'
import carti from './cartii.png'

export const assets = {
    logo,
    search,
    shoppingcart,
    add,
    plusgreen,
    minusred,
    facebook,
    linkdin,
    x,
    pla,
    aplo,
    cancel,
    use,
    lout,
    bag,
    carti,
}

export const menu_list = [
    { menu_name: "Pizza", menu_Image: menu1 },
    { menu_name: "Pasta", menu_Image: menu2 },
    { menu_name: "Stew", menu_Image: menu3 },
    { menu_name: "Sides", menu_Image: menu4 },
    { menu_name: "Korean", menu_Image: menu5 },
    { menu_name: "Burger", menu_Image: menu6 },
    { menu_name: "Salad", menu_Image: menu7 },
    { menu_name: "Biryani", menu_Image: menu8 },
    { menu_name: "Steaks", menu_Image: menu9 },
    { menu_name: "Vegetarian", menu_Image: menu10 },
    { menu_name: "Deserts", menu_Image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80" },
    { menu_name: "Rolls", menu_Image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=300&q=80" },
]

export const default_food_list = [
    // Pizza
    {
        _id: "def_1",
        name: "Classic Margherita Pizza",
        description: "Fresh Mozzarella, San Marzano tomato sauce, fresh basil leaves, and extra virgin olive oil drizzle.",
        price: 299,
        Image: menu1,
        category: "Pizza"
    },
    {
        _id: "def_2",
        name: "Double Pepperoni Feast",
        description: "Loaded with double layer of crispy beef pepperoni, melted mozzarella cheese, and secret Italian herb seasoning.",
        price: 389,
        Image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
        category: "Pizza"
    },
    {
        _id: "def_3",
        name: "BBQ Chicken Supreme Pizza",
        description: "Smokey BBQ chicken breast, red onions, sweet corn, cilantro, and tangy mozzarella cheddar blend.",
        price: 429,
        Image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
        category: "Pizza"
    },
    {
        _id: "def_4",
        name: "Truffle Mushroom Pizza",
        description: "Wild sauteed mushrooms, white truffle oil, caramelized onions, fontina and parmesan cheese.",
        price: 469,
        Image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
        category: "Pizza"
    },

    // Pasta
    {
        _id: "def_5",
        name: "Creamy Alfredo Fettuccine",
        description: "Rich parmesan cream sauce, roasted garlic, fresh parsley, and grilled chicken breast fillets.",
        price: 349,
        Image: menu2,
        category: "Pasta"
    },
    {
        _id: "def_6",
        name: "Penne Alla Arrabbiata",
        description: "Spicy Italian tomato sauce, crushed red chillies, garlic, fresh basil, and shaved parmesan.",
        price: 289,
        Image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&w=600&q=80",
        category: "Pasta"
    },
    {
        _id: "def_7",
        name: "Pesto Basil Tagliatelle",
        description: "Handcrafted pine nut and basil pesto with cherry tomatoes, toasted pine nuts, and virgin olive oil.",
        price: 329,
        Image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80",
        category: "Pasta"
    },

    // Burger
    {
        _id: "def_8",
        name: "Smokey Angus Cheeseburger",
        description: "Juicy 100% Angus beef patty, melted cheddar cheese, caramelized onions, smoked bacon jam, and brioche bun.",
        price: 299,
        Image: menu6,
        category: "Burger"
    },
    {
        _id: "def_9",
        name: "Crispy Zinger Chicken Burger",
        description: "Extra crunchy spiced fried chicken fillet, creamy coleslaw, spicy mayo, and pickles on a toasted bun.",
        price: 269,
        Image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
        category: "Burger"
    },
    {
        _id: "def_10",
        name: "Truffle Veggie Burger",
        description: "House-made black bean and quinoa patty, avocado, spicy aioli, microgreens, and vegan cheese.",
        price: 249,
        Image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
        category: "Burger"
    },

    // Biryani
    {
        _id: "def_11",
        name: "Hyderabadi Chicken Dum Biryani",
        description: "Long grain fragrant basmati rice cooked with marinated chicken, saffron, caramelised onions, and whole aromatic spices.",
        price: 369,
        Image: menu8,
        category: "Biryani"
    },
    {
        _id: "def_12",
        name: "Royal Mutton Dum Biryani",
        description: "Tender slow-cooked mutton chunks layered with spiced basmati rice, mint, ghee, and roasted cashews.",
        price: 489,
        Image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80",
        category: "Biryani"
    },

    // Steaks
    {
        _id: "def_13",
        name: "Ribeye Steak with Garlic Butter",
        description: "Prime 300g Ribeye steak seared to perfection with rosemary garlic butter, served with mashed potatoes.",
        price: 699,
        Image: menu9,
        category: "Steaks"
    },
    {
        _id: "def_14",
        name: "Pan Seared Salmon Steak",
        description: "Fresh Atlantic salmon fillet with lemon herb butter sauce, asparagus spears, and wild rice blend.",
        price: 649,
        Image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
        category: "Steaks"
    },

    // Vegetarian
    {
        _id: "def_15",
        name: "Shahi Paneer Tikka Masala",
        description: "Char-grilled cottage cheese cubes simmered in a rich cashew tomato gravy with aromatic Kasuri Methi.",
        price: 319,
        Image: menu10,
        category: "Vegetarian"
    },
    {
        _id: "def_16",
        name: "Dal Makhani Special",
        description: "Slow-cooked black lentils simmered overnight with cream, butter, garlic, and traditional spices.",
        price: 249,
        Image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
        category: "Vegetarian"
    },

    // Korean
    {
        _id: "def_17",
        name: "Cheesy Rice Tteokbokki",
        description: "Chewy Korean rice cakes cooked in sweet and spicy Gochujang sauce with melted mozzarella and fish cakes.",
        price: 339,
        Image: menu5,
        category: "Korean"
    },
    {
        _id: "def_18",
        name: "Korean Fried Chicken Wings",
        description: "Double fried crispy chicken wings glazed in honey soy garlic sauce and sprinkled with toasted sesame.",
        price: 379,
        Image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80",
        category: "Korean"
    },

    // Salad
    {
        _id: "def_19",
        name: "Chopped Mediterranean Salad",
        description: "Fresh cucumbers, kalamata olives, cherry tomatoes, crumbled feta cheese, chickpeas, and lemon vinaigrette.",
        price: 229,
        Image: menu7,
        category: "Salad"
    },
    {
        _id: "def_20",
        name: "Avocado Quinoa Power Bowl",
        description: "Organic quinoa, sliced avocado, edamame, roasted sweet potatoes, kale, and tahini dressing.",
        price: 279,
        Image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
        category: "Salad"
    },

    // Stew
    {
        _id: "def_21",
        name: "Slow Cooked Beef Stew",
        description: "Tender beef chunks slow-braised with baby carrots, potatoes, rosemary, and rich red wine gravy.",
        price: 449,
        Image: menu3,
        category: "Stew"
    },

    // Sides
    {
        _id: "def_22",
        name: "Cheese Garlic Butter Naan",
        description: "Traditional Indian flatbread stuffed with mozzarella cheese, brushed with garlic butter and fresh cilantro.",
        price: 99,
        Image: menu4,
        category: "Sides"
    },
    {
        _id: "def_23",
        name: "Truffle Parmesan Fries",
        description: "Hand-cut crispy fries tossed with truffle oil, aged parmesan, rosemary, and served with garlic aioli.",
        price: 149,
        Image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
        category: "Sides"
    },

    // Deserts
    {
        _id: "def_24",
        name: "Molten Lava Chocolate Cake",
        description: "Decadent warm chocolate cake with a gooey oozing center, served with Madagascar vanilla ice cream.",
        price: 199,
        Image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
        category: "Deserts"
    },
    {
        _id: "def_25",
        name: "New York Creamy Cheesecake",
        description: "Classic rich and velvety cheesecake on a graham cracker crust, topped with fresh strawberry compote.",
        price: 219,
        Image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
        category: "Deserts"
    },

    // Rolls
    {
        _id: "def_26",
        name: "Kolkata Chicken Kathi Roll",
        description: "Flaky paratha wrapped around spiced juicy chicken tikka, sliced onions, green chillies, and mint chutney.",
        price: 189,
        Image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80",
        category: "Rolls"
    },
    {
        _id: "def_27",
        name: "Paneer Cheese Frankie Roll",
        description: "Crispy wheat wrap stuffed with spiced paneer cubes, capsicum, cheese slice, and tangy frankie masala.",
        price: 169,
        Image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80",
        category: "Rolls"
    }
];

export const food_list = default_food_list;