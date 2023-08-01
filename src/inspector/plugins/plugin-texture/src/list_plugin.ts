import {
	BaseBladeParams,
	BladePlugin,
	parseRecord,
	VERSION,
} from '@tweakpane/core';

import {SeparatorBladeApi} from './list_api';
import {SeparatorController} from './list_controller';

export interface SeparatorBladeParams extends BaseBladeParams {
	view: 'three-list';
}

export const ListBladePlugin: BladePlugin<SeparatorBladeParams> = {
	id: 'three-list',
	type: 'blade',
	core: VERSION,
	accept(params) {
		const result = parseRecord<SeparatorBladeParams>(params, (p) => ({
			view: p.required.constant('three-list'),
		}));
		return result ? {params: result} : null;
	},
	controller(args) {
		return new SeparatorController(args.document, {
			blade: args.blade,
			viewProps: args.viewProps,
		});
	},
	api(args) {
		if (!(args.controller instanceof SeparatorController)) {
			return null;
		}
		return new SeparatorBladeApi(args.controller);
	},
};
