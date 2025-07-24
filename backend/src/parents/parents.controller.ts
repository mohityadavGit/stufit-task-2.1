import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { ParentDetailsDto } from './dto/parents.dto';
import { addChildrenDto } from './dto/addChildren.dto';

@Controller('parents')
export class ParentsController {
    constructor(private readonly parentsService: ParentsService) { }

    @Get('details')
    getParentDetails(@Query() dto: ParentDetailsDto) 
    {
        return this.parentsService.getParentDetails(dto);
    }

    @Patch('update')
    addChildrenDetails(@Body() dto:addChildrenDto){
        return this.parentsService.addChildrenDetails(dto);
    }
}
