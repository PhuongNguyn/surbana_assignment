import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'locations' })
export class LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, nullable: false })
  building: string;

  @Column({ type: String, nullable: false })
  location_name: string;

  @Column({ type: String, nullable: false, unique: true })
  location_number: string;

  @Column({ type: Number, nullable: false })
  area: number;

  @Column('ltree')
  path: string;
}
