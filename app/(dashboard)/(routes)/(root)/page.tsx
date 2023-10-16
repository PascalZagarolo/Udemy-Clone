import { getDashboardCourses } from '@/actions/get-dashboard-courses';
import CoursesList from '@/components/courses-list';
import { UserButton, auth } from '@clerk/nextjs'
import { CheckCheckIcon, Clock } from 'lucide-react';
import Image from 'next/image'
import { redirect } from 'next/navigation';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import InfoCard from './_components/info-card';


export default async function Dashboard() {

  const { userId } = auth();

  if (!userId) {
    return redirect("/")
  }

  
  const { completedCourses, coursesInProgress } = await getDashboardCourses(userId)

  
  
  
 

  return (
    <div className='p-6 space-y-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <InfoCard
          icon={Clock}
          label="Noch nicht abgeschlossen"
          numberOfItems={coursesInProgress.length}
        />


        <InfoCard
          icon={CheckCheckIcon}
          label="Abgeschlossene Kurse"
          numberOfItems={completedCourses.length}
          variant='success'
        />
      </div>
      
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  )
}