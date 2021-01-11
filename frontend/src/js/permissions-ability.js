import { AbilityBuilder, Ability } from '@casl/ability'

const { can, cannot, build } = new AbilityBuilder(Ability);

can('read', 'post');
can('create', 'Post');
cannot('delete', 'post', { published: true });

export default build();