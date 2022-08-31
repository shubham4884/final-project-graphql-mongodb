
import { Resolver, Query, Mutation, Args, ResolveField, Parent  } from "@nestjs/graphql";
import { StudentService } from "src/student/student.service";
import { assignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(of => LessonType)
export class LessonResolver{
    constructor(
        private lessonService:LessonService,
        private studentService: StudentService,
    ){}

    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string,

    ){
        return this.lessonService.getLesson(id);
    }
    // {
    //     return{
    //         id: 'asdjo12j31a',
    //         name: 'Physics Class',
    //         startDate: (new Date()).toISOString(),
    //         endDate: (new Date()).toISOString()
    //     };
// }

    @Query(returns => [LessonType])
    lessons(){
        return this.lessonService.getLessons();
    }


    @Mutation(returns => LessonType)
    createLesson(
        // @Args('name') name:string,
        // @Args('startDate') startDate:string,
        // @Args('endDate') endDate: string

        @Args('createLessonInput') createLessonInput: CreateLessonInput,
    ){
        return this.lessonService.createLesson(createLessonInput);
    }
    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLessonInput') assignStudentsToLessonInput: assignStudentsToLessonInput,
    ){
        const { lessonId, studentIds } = assignStudentsToLessonInput;
        return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson){
        return this.studentService.getManyStudents(lesson.students);
        
    }
}