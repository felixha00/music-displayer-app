import React from 'react';
import { Box, BoxProps, TextProps, Text, Heading } from '@chakra-ui/layout';
import { motion } from 'framer-motion';

export const MotionBox = motion<BoxProps>(Box);
export const MotionText = motion<TextProps>(Text);
export const MotionHeading = motion<TextProps>(Heading);
export default {};
