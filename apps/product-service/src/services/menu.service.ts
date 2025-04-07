import { Injectable, NotFoundException } from '@nestjs/common';
import { MenuRepository } from '../repositories/menu.repository';
import { CreateMenuDto, UpdateMenuDto, MenuDto } from '../dto';

@Injectable()
export class MenuService {
  constructor(private readonly menuRepository: MenuRepository) {}

  async create(createMenuDto: CreateMenuDto): Promise<MenuDto> {
    const menu = await this.menuRepository.create(createMenuDto);
    return this.mapToDto(menu);
  }

  async findAll(restaurantId?: number): Promise<MenuDto[]> {
    let menus;
    if (restaurantId) {
      menus = await this.menuRepository.findByRestaurant(restaurantId);
    } else {
      menus = await this.menuRepository.findAll();
    }
    return menus.map(menu => this.mapToDto(menu));
  }

  async findOne(id: number): Promise<MenuDto> {
    const menu = await this.menuRepository.findOne(id);
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
    return this.mapToDto(menu);
  }

  async update(id: number, updateMenuDto: UpdateMenuDto): Promise<MenuDto> {
    await this.findOne(id);
    const menu = await this.menuRepository.update(id, updateMenuDto);
    return this.mapToDto(menu);
  }

  async remove(id: number): Promise<MenuDto> {
    await this.findOne(id);
    const menu = await this.menuRepository.remove(id);
    return this.mapToDto(menu);
  }

  async updateAvailability(id: number, isAvailable: boolean): Promise<MenuDto> {
    await this.findOne(id);
    const menu = await this.menuRepository.update(id, { isAvailable });
    return this.mapToDto(menu);
  }

  private mapToDto(menu: any): MenuDto {
    return {
      ...menu,
      isAvailable: menu.isAvailable ?? true
    };
  }
} 