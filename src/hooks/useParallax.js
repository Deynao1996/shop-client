import {useSpring, animated} from 'react-spring';

const useParallax = ({className, sensivity}) => {
  const sens = sensivity ? sensivity : 100;
  const [propss, sets] = useSpring(() => ({xys: [0, 0, sens]}));

  const calc = (x, y, sens) => [-(y - window.innerHeight / 2) / sens, (x - window.innerWidth / 2) / sens, sens];
  const trans = (x, y) => `perspective(600px) translateX(${x}px) translateY(${y}px)`;


  const ParallaxContainer = ({children, ...props}) => (
    <animated.div
        {...props}
        className={className}
        onMouseMove={
          ({clientX: x, clientY: y}) => (sets.start({xys: calc(x, y, sens)}))}
        onMouseLeave={() => sets.start({xys:[0, 0, sens]})}
        style={{
            transform: propss.xys.to(trans)
          }}>
          {children}
    </animated.div>
  )

  return {ParallaxContainer}
};

export default useParallax;
