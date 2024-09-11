// pink-noise-processor.js
class PinkNoiseProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.b0 = this.b1 = this.b2 = this.b3 = this.b4 = this.b5 = this.b6 = 0;
    }

    process(inputs, outputs, parameters) {
        const output = outputs[0];
        for (let channel = 0; channel < output.length; channel++) {
            const outputChannel = output[channel];
            for (let i = 0; i < outputChannel.length; i++) {
                let white = Math.random() * 2 - 1; // Generate white noise (-1 to 1)

                // Pink noise formula based on Paul Kellet's filter algorithm
                this.b0 = 0.99886 * this.b0 + white * 0.0555179;
                this.b1 = 0.99332 * this.b1 + white * 0.0750759;
                this.b2 = 0.96900 * this.b2 + white * 0.1538520;
                this.b3 = 0.86650 * this.b3 + white * 0.3104856;
                this.b4 = 0.55000 * this.b4 + white * 0.5329522;
                this.b5 = -0.7616 * this.b5 - white * 0.0168980;
                let pink = this.b0 + this.b1 + this.b2 + this.b3 + this.b4 + this.b5 + this.b6 + white * 0.5362;
                this.b6 = white * 0.115926;

                // Output the pink noise
                outputChannel[i] = pink * 0.05; // Adjust the volume scale
            }
        }
        return true;
    }
}

registerProcessor('pink-noise-processor', PinkNoiseProcessor);
