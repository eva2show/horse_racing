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

import {PluginController} from './texture_controller';
import {ImageResolvable} from './model';

export interface PluginInputParams extends BaseInputParams {
	view: 'three-texture';
}

export const TweakpaneImagePlugin: InputBindingPlugin<
	ImageResolvable,
	ImageResolvable,
	PluginInputParams
> = {
	id: 'three-texture',
	type: 'input',
	core: VERSION,

	accept(exValue: unknown, params) {
		if (!(exValue instanceof HTMLImageElement || typeof exValue === 'string')) {
			return null;
		}

		const result = parseRecord<PluginInputParams>(params, (p) => ({
			view: p.required.constant('three-texture')
		}));
		return result
			? {
					initialValue: exValue,
					params: result,
			  }
			: null;
	},

	binding: {
		reader(_args) {
			return (exValue: unknown): ImageResolvable => {
				if (exValue instanceof HTMLImageElement) {
					return exValue.src === '' ? 'placeholder' : exValue.src;
				} else {
					return typeof exValue === 'string' ? exValue : 'placeholder';
				}
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
