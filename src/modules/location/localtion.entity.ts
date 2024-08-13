import { Column, Entity, PrimaryGeneratedColumn, Tree } from 'typeorm';

@Entity({ name: 'localtions' })
@Tree('closure-table')
export class LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, nullable: false })
  building: string;

  @Column({ type: String, nullable: false })
  location_name: string;

  @Column({ type: String, nullable: false })
  location_number: string;

  @Column({ type: Number, nullable: false })
  area: number;

  @Column('ltree')
  path: string;
}
