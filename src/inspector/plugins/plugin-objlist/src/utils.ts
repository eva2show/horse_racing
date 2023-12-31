export function createPlaceholderImage(): Promise<HTMLImageElement> {
	const canvas = document.createElement('canvas');
	canvas.width = 128;
	canvas.height = 128;

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const ctx = canvas.getContext('2d')!;
	ctx.fillStyle = '#222';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#ddd';
	ctx.font = 'monospaced';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText('No image', canvas.width * 0.5, canvas.height * 0.5);

	return new Promise((resolve) => {
		canvas.toBlob((blob) => {
			const image = new Image();
			image.src = URL.createObjectURL(blob);
			image.onload = () => {
				resolve(image);
			};
		});
	});
}

export async function loadImage(src: string): Promise<HTMLImageElement> {
	const image = new Image();
	image.crossOrigin = 'anonymous';
	return new Promise((resolve) => {
		image.src = src;
		image.onload = () => {
			resolve(image);
		};
	});
}

export function cloneImage(
	source: HTMLImageElement,
): Promise<HTMLImageElement> {
	const canvas = document.createElement('canvas');
	canvas.width = source.width;
	canvas.height = source.height;

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const ctx = canvas.getContext('2d')!;
	ctx.drawImage(source, 0, 0);

	const image = new Image();
	return new Promise((resolve) => {
		canvas.toBlob((blob) => {
			image.src = URL.createObjectURL(blob);
			image.onload = () => {
				resolve(image);
			};
		});
	});
}
