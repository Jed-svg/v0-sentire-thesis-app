import React from 'react';

async function getStudent(id: string): Promise<{ id: string }> {
 const response = await fetch(`/api/students/${id}`);
 if (!response.ok) {
 throw new Error('Failed to fetch student data');
 }
 return await response.json();
}

const StudentPage = async ({ params }: { params: { id: string } }) => {
 const { id } = params;
 const student = await getStudent(id);
 
 return (
   <div>
     <h1>Student Detail for {student.id}</h1>
     {/* Implement wellness metrics and student insights here */}
   </div>
 );
};

export default StudentPage;
