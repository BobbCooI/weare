import { Image } from "@chakra-ui/react";

type WeatherIconProps = {
  icon: string;
  size?: number;
};

export const WeatherIcon = ({ icon, size = 12 }: WeatherIconProps) => (
  <Image
    src={`http://openweathermap.org/img/w/${icon}.png`}
    alt="Weather Icon"
    boxSize={`${size}px`}
  />
);