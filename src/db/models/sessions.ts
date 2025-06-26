import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      res: 'users',
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const sessionCollection = model('sessions', sessionSchema);
