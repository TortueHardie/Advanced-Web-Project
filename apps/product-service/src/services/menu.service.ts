import { Injectable, NotFoundException } from '@nestjs/common';
import { MenuRepository } from '../repositories/menu.repository';
import { CreateMenuDto, UpdateMenuDto, MenuDto } from '../dto';

@Injectable()
export class MenuService {
  constructor(private readonly menuRepository: MenuRepository) {}

  async create(createMenuDto: CreateMenuDto): Promise<MenuDto> {
    return this.menuRepository.create(createMenuDto);
  }

  async findAll(restaurantId: number): Promise<MenuDto[]> {
    return this.menuRepository.findAll(restaurantId);
  }

  async findOne(id: number): Promise<MenuDto> {
    const menu = await this.menuRepository.findOne(id);
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
    return menu;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto): Promise<MenuDto> {
    await this.findOne(id);
    return this.menuRepository.update(id, updateMenuDto);
  }

  async remove(id: number): Promise<MenuDto> {
    await this.findOne(id);
    return this.menuRepository.remove(id);
  }

  async updateAvailability(id: number, isAvailable: boolean): Promise<MenuDto> {
    await this.findOne(id);
    return this.menuRepository.updateAvailability(id, isAvailable);
  }
} 