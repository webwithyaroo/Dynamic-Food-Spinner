import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaAngleLeft,
  FaAngleRight,
  FaStar,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";

// FOOD DATA
const food = [
  {
    name: "LOTEK",
    Image: "food2.png",
    desc: "PERKEDEL",
    category: 1,
    ratings: 4.9,
    chef: "chef maria",
    text: "Chef Maria's culinary creations are nothing short of spectacular. Every dish she serves is a masterpiece, blending flavors and textures that delight the palate. Her attention to detail and commitment to quality ingredients make each meal an unforgettable experience. Highly recommend for anyone seeking exceptional dining!",
  },
  {
    name: "KARAKTER",
    Image: "food2.png",
    desc: "FOODS",
    category: 2,
    ratings: 3.7,
    chef: " chef james",
    text: "Chef James delivers consistently delicious meals with creative flair. His signature dishes are always a hit, and his ability to adapt to dietary preferences is impressive. The only reason I'm not giving five stars is that occasionally the wait time can be a bit longer than expected. Nevertheless, his food is worth the wait!",
  },
  {
    name: "BASMATII",
    Image: "food3.png",
    desc: "RICE",
    category: 3,
    ratings: 5,
    chef: "chef lily",
    text: "I've had the pleasure of dining at Chef Lily’s restaurant multiple times, and each visit has been a delight. Her innovative approach to classic dishes is refreshing, and her use of fresh, seasonal ingredients elevates the dining experience. The ambiance of the restaurant complements her exceptional cooking. A true gem!",
  },
  {
    name: "MARTABAK",
    Image: "food4.png",
    desc: "PAKADIN",
    category: 4,
    ratings: 3.4,
    chef: "chef David",
    text: "Chef David is a culinary genius. His dishes are beautifully presented and bursting with flavor. From appetizers to desserts, every course is thoughtfully crafted and executed. The attention to detail and dedication to perfection is evident in every bite. A must-try for food enthusiasts!",
  },
  {
    name: "URAP ASLI",
    Image: "food5.png",
    desc: "WONOGIRI",
    category: 5,
    ratings: 4.9,
    chef: "chef Laura",
    text: "Chef Laura’s food is a delightful blend of tradition and innovation. Her dishes are always flavorful and well-balanced, with a creative touch that makes each meal special. The service is attentive, and the atmosphere is inviting. My only critique is that the menu could benefit from more variety, but overall, it’s a fantastic dining experience.",
  },
];

const App = () => {
  const angle = 360 / food.length;
  const [clicked, setClicked] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [animateText, setAnimateText] = useState(false);

  const handleRotation = (direction) => {
    const newIndex =
      (clicked + (direction === "left" ? -1 : 1) + food.length) % food.length;
    setClicked(newIndex);
    setRotation(rotation + (direction === "left" ? -angle : angle));
    setAnimateText(true);
    setTimeout(() => setAnimateText(false), 500); // Reset animation after 500ms
  };

  const recent = food[clicked];

  return (
    <section className="bg-green-400 relative h-screen w-full">
      <FoodPallete
        angle={angle}
        rotation={rotation}
        recent={recent}
        animateText={animateText}
      />
      <FoodNav
        clicked={clicked}
        setClicked={setClicked}
        handleRotation={handleRotation}
      />
      <AsideBar food={recent} animateText={animateText} />
    </section>
  );
};

// Food Palette Component
const FoodPallete = ({ angle, rotation, recent, animateText }) => {
  const radius = 340; // Adjusted radius for better visibility

  return (
    <section className="relative flex items-center w-full">
      <motion.div
        className="relative -top-[380px] -left-[120px] ring-[220px] ring-green-100 ring-opacity-25 shadow-2xl rounded-full w-[500px] h-[500px] flex items-center justify-center"
        style={{ transform: `rotate(${rotation}deg)` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        animate={{ rotate: rotation }}
      >
        {food.map((item, index) => {
          const rotateAngle = angle * index;
          const transform = `rotate(${rotateAngle}deg) translate(${radius}px) rotate(-${rotateAngle}deg)`;

          return (
            <motion.div
              key={item.name}
              className="absolute flex items-center justify-center"
              style={{ transform }}
              transition={{ duration: 0.3 }}
            >
              <span className="flex-shrink-0">
                <img
                  src={item.Image}
                  alt={item.name}
                  className="w-[320px] h-[320px] object-contain rotate-90 object-center"
                />
              </span>
            </motion.div>
          );
        })}
      </motion.div>
      <div>
        <motion.p
          initial={{ scale: 1 }}
          animate={animateText ? { scale: 1.2 } : { scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-4xl text-slate-200"
        >
          {recent.desc}
        </motion.p>
        <motion.h1
          initial={{ translateX: -80, opacity: 0 }}
          animate={
            animateText
              ? { translateX: 0, opacity: 1 }
              : { translateX: -80, opacity: 1 }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-6xl font-extrabold"
        >
          {recent.name}
        </motion.h1>
      </div>
    </section>
  );
};

// Food Navigation Component
const FoodNav = ({ clicked, handleRotation, setClicked }) => {
  return (
    <section className="w-full absolute bottom-10">
      <ul className="flex items-center ml-40 gap-x-5 w-[700px]">
        <motion.div
          className="flex-shrink-0"
          whileTap={{ scale: 0.2 }}
          onClick={() => handleRotation("left")}
        >
          <FaAngleLeft size={32} />
        </motion.div>
        {food.map(({ name, Image, desc }, index) => (
          <motion.li
            key={name}
            className="bg-green-300 flex-shrink-0 w-[120px] shadow-2xl rounded-xl p-4 cursor-pointer"
            initial={{ scale: 0.5 }}
            animate={{ scale: clicked === index ? 1 : 0.7 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setClicked(index)}
          >
            <span>
              <img src={Image} alt="image" className="w-20 h-20 object-cover" />
            </span>
            <div className="text-center pt-2 font-medium">
              <p>{name}</p>
              <p>{desc}</p>
            </div>
          </motion.li>
        ))}
        <motion.div
          className="flex-shrink-0"
          whileTap={{ scale: 0.9 }}
          onClick={() => handleRotation("right")}
        >
          <FaAngleRight size={32} />
        </motion.div>
      </ul>
    </section>
  );
};

// Aside Bar Component
const AsideBar = ({ food, animateText }) => {
  return (
    <section className="p-6 absolute right-5 bottom-0 h-[60%] w-[320px] rounded-tl-2xl rounded-tr-2xl bg-white">
      {/* <div className="w-full flex justify-between items-center pb-6 text-gray-900 text-xl">
        <p>Overview</p>
        <p>Ingredient</p>
      </div> */}
      <motion.span
        className="w-14 h-20 rounded-xl inline-block relative bg-green-400"
        initial={{ translateX: 10, opacity: 0 }}
        animate={
          animateText
            ? { translateX: 0, scale: 1.2, opacity: 1 }
            : { translateX: 10, opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="absolute left-4 text-5xl font-bold">{food.ratings}</p>
        <FaStar
          size={15}
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
        />
      </motion.span>
      <div>
        <p className="text-gray-900 text-3xl capitalize">{food.chef}</p>
        <div className="h-36 overflow-auto font-Monts text-lg">
          <p>{food.text}</p>
        </div>
        <div className="flex gap-x-5">
          <div className="flex items-center justify-center gap-x-4 mt-2">
            <FaThumbsUp size={24} />
            <p className="font-bold">{food.ratings}</p>
          </div>
          <FaThumbsDown size={24} color="#5433" />
        </div>
      </div>
    </section>
  );
};

export default App;
