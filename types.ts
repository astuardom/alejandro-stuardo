
// Added React import to provide access to React namespace types
import React from 'react';

export interface ProjectDetails {
  problemSolved: string;
  highlightsTitle?: string;
  highlights: string[];
  featuresTitle?: string;
  featureSections: {
    title: string;
    items: string[];
  }[];
  techStack: { name: string; description: string }[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  whatsappUrl: string;
  details?: ProjectDetails;
}

export interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
}

export interface SkillData {
  subject: string;
  A: number;
  fullMark: number;
}

export type MessageStatus = 'new' | 'read' | 'replied';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: MessageStatus;
}
