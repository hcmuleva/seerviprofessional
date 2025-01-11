import React from 'react'
import { Text, View } from 'react-native';

export default function ProfessionDetails({route}) {
    const {userData,itemkey} = route.params;
  const professionlist = [
    {
      "profession": "Software Developer",
      "description": "Designs, develops, and maintains software applications.",
      "skills": ["Programming", "Problem-solving", "Teamwork", "Debugging"],
      "industry": ["Technology", "Finance", "Healthcare"]
    },
    {
      "profession": "Data Scientist",
      "description": "Analyzes complex datasets to derive insights and inform decision-making.",
      "skills": ["Data Analysis", "Machine Learning", "Statistics", "Python"],
      "industry": ["Technology", "Retail", "Finance"]
    },
    {
      "profession": "Teacher",
      "description": "Educates students and develops lesson plans for various subjects.",
      "skills": ["Communication", "Patience", "Organization"],
      "industry": ["Education"]
    },
    {
      "profession": "Nurse",
      "description": "Provides medical care and support to patients in healthcare settings.",
      "skills": ["Compassion", "Medical Knowledge", "Attention to Detail"],
      "industry": ["Healthcare"]
    },
    {
      "profession": "Doctor",
      "description": "Diagnoses and treats illnesses and injuries.",
      "skills": ["Medical Expertise", "Empathy", "Critical Thinking"],
      "industry": ["Healthcare"]
    },
    {
      "profession": "Lawyer",
      "description": "Advises clients on legal matters and represents them in court.",
      "skills": ["Legal Research", "Communication", "Negotiation"],
      "industry": ["Legal", "Corporate"]
    },
    {
      "profession": "Architect",
      "description": "Designs and oversees the construction of buildings and infrastructure.",
      "skills": ["Creativity", "Technical Knowledge", "Attention to Detail"],
      "industry": ["Construction", "Real Estate"]
    },
    {
      "profession": "Accountant",
      "description": "Manages financial records and ensures compliance with regulations.",
      "skills": ["Attention to Detail", "Analytical Skills", "Accounting Software"],
      "industry": ["Finance", "Corporate"]
    },
    {
      "profession": "Civil Engineer",
      "description": "Plans and designs infrastructure projects like roads and bridges.",
      "skills": ["Mathematics", "Project Management", "Technical Knowledge"],
      "industry": ["Construction", "Government"]
    },
    {
      "profession": "Graphic Designer",
      "description": "Creates visual content to communicate ideas effectively.",
      "skills": ["Creativity", "Adobe Suite", "Typography"],
      "industry": ["Media", "Marketing", "Technology"]
    },
    {
      "profession": "Marketing Manager",
      "description": "Develops and implements marketing strategies to promote products or services.",
      "skills": ["Strategic Planning", "Communication", "Data Analysis"],
      "industry": ["Retail", "Technology", "Corporate"]
    }]

  return (
    <View>
     
      {professionlist.map((profession, index) => {
        return (
          <View key={index}>
            <Text>{profession.profession}</Text>
            <Text>{profession.description}</Text>
           
            <Text>
              {profession.skills.map((skill, index) => {
                return <Text key={index}>{skill}</Text>
              })}
            </Text>
            <Text>Industry</Text>
            <Text>
              {profession.industry.map((industry, index) => {
                return <Text key={index}>{industry}</Text>
              })}
            </Text>
          </View>
        )
      })}
    </View>
  )
}
