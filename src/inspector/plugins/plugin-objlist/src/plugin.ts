import {
	createNumberFormatter,
	createNumberTextInputParamsParser,
	createNumberTextPropsObject,
	InputBindingPlugin,
	numberFromUnknown,
	parseNumber,
	parseRecord,
	ValueMap,
	VERSION,
	BindingTarget,
	BaseInputParams,
	writePrimitive,
} from '@tweakpane/core';

import {PluginController} from './controller';
import {Object3DResolvable} from './model';

export interface PluginInputParams extends BaseInputParams {
	view: 'three-object3d';
}

export const TweakpaneListPlugin: InputBindingPlugin<
	Object3DResolvable,
	Object3DResolvable,
	PluginInputParams
> = {
	id: 'three-object3d',
	type: 'input',
	core: VERSION,

	accept(exValue: unknown, params) {

		// if(!exValue.uuid){
		// 	return;
		// }

		const result = parseRecord<PluginInputParams>(params, (p) => ({
			view: p.required.constant('three-object3d')
		}));
		return result
			? {
					initialValue: exValue,
					params: result,
			  }
			: null;

	},

	binding: {
		// reader: (_args) => numberFromUnknown,
		// constraint: (args) => createConstraint(args.params),
		// writer: (_args) => writePrimitive,

		reader(_args) {
			return (exValue: unknown): Object3DResolvable => {
				return exValue
			};
		},

		writer(_args) {
			return (target: BindingTarget, inValue) => {
				target.write(inValue);
			};
		},
	},

	controller(args) {
		return new PluginController(args.document, {
			value: args.value,
			viewProps: args.viewProps
		});
	},
};
