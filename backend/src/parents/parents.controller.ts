import { Controller, Get, Query } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { ParentDetailsDto } from './dto/parents.dto';

@Controller('parents')
export class ParentsController {
    constructor(private readonly parentsService: ParentsService) { }

    @Get('details')
    getStudentDetails(@Query() dto: ParentDetailsDto) 
    {
        return this.parentsService.getParentDetails(dto);
    }
}
